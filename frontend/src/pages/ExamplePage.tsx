import useExample from '@/hooks/server/useExample';

const ExamplePage = () => {
  const data = useExample();
  console.log(data);

  return (
    <div>
      <div>example</div>
    </div>
  );
};

export default ExamplePage;
